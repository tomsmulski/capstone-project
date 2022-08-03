export const getResourcesTypes = async () => {
  try {
    const response = await fetch(`/api/resourcestypes`);
    if (response.ok) {
      const resourcestypes = await response.json();
      return await resourcestypes;
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
