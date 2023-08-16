const sortedArray = data.sort((a, b) => {
  const timestampA = parseInt(a.imageId);
  const timestampB = parseInt(b.imageId);

  return timestampB - timestampA;
});

export default sortedArray;
