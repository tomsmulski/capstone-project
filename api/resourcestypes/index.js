import {ResourcesTypes} from '../_database/models/index';
import connectToMongodb from '../_database/connect-to-mongodb';

const handler = async (request, response) => {
  try {
    await connectToMongodb();

    if (request.method === 'GET') {
      const resourcesTypes = await ResourcesTypes.find();

      return response.status(200).json(resourcesTypes);
    }
  } catch (error) {
    return response.status(500).json({message: 'Server Error' + error.message});
  }
};
export default handler;
