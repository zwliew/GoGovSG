import { inject, injectable } from 'inversify'
import Express from 'express'
import { DirectorySearchService } from './interfaces'
import { DependencyIds } from '../../constants'
import { logger } from '../../config'
import jsonMessage from '../../util/json'
import { SearchResultsSortOrder } from '../../../shared/search'

@injectable()
export class DirectoryController {
  private directorySearchService: DirectorySearchService

  public constructor(
    @inject(DependencyIds.directorySearchService)
    directorySearchService: DirectorySearchService,
  ) {
    this.directorySearchService = directorySearchService
  }

  public getDirectoryWithConditions: (
    req: Express.Request,
    res: Express.Response,
  ) => Promise<void> = async (req, res) => {
    let { limit = 100, query = '', order = '' } = req.query
    limit = Math.min(100, Number(limit))
    query = query.toString().toLowerCase()
    order = order.toString()
    const { offset = 0, isFile, state, isEmail } = req.query

    const queryConditions = {
      query,
      order: order as SearchResultsSortOrder,
      limit,
      offset: Number(offset),
      state: state?.toString(),
      isFile: undefined as boolean | undefined,
      isEmail: isEmail === 'true',
    }

    // Reassign isFile to true / false / undefined (take both files and url)
    if (isFile === 'true') {
      queryConditions.isFile = true
    } else if (isFile === 'false') {
      queryConditions.isFile = false
    } else {
      queryConditions.isFile = undefined
    }

    try {
      const { urls, count } = await this.directorySearchService.plainTextSearch(
        queryConditions,
      )

      res.ok({
        urls,
        count,
      })
      return
    } catch (error) {
      logger.error(`Error searching urls: ${error}`)
      res.serverError(jsonMessage('Error retrieving URLs for search'))
    }
  }
}

export default DirectoryController
