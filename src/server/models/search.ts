// Warning: This expression and conditions has to be EXACTLY the same as the one used in the index
// or else the index will not be used leading to unnecessarily long query times.
export const urlSearchVector = `
  setweight(to_tsvector('english', urls."shortUrl"), 'A') ||
  setweight(to_tsvector('english', urls."longUrl"), 'B') ||
  setweight(to_tsvector('english', urls."description"), 'C')
`

export default urlSearchVector
