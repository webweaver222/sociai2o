import TestifyApi from "../src/services/testifyApi";

const service = new TestifyApi();

const mockApi = resolveTo => {
  service.post = jest.fn();

  service.post.mockResolvedValueOnce(resolveTo);

  return service;
};

export default mockApi;
