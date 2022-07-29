export const getUserCitys = async () => {
    try {
      const response = await fetch(`/api/usercitys`);
      if (response.ok) {
        const usercitys = await response.json();
        return await usercitys;
      } else {
        throw new Error(`${response.status}`);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  

  