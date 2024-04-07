export const getShortAddress = (address: string, start = 5, endCount = 4) =>
  `${address?.slice(0, start)}...${address?.slice(
    address?.length - (endCount ?? start + 1),
  )}`;
