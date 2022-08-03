export const getBuildingsTypes = async () => {
  try {
    const response = await fetch(`/api/buildingstypes`);
    if (response.ok) {
      const buildingstypes = await response.json();
      return await buildingstypes;
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
