import resizeImage from '../resize-image';

describe('Image Resizing', () => {
  describe('when valid parameters are passed', () => {
    it('resizes the image and returns resized buffer', async () => {
      // Mock req object
      const req = jasmine.createSpyObj('req', ['query']);
      req.query = {
        filename: 'palmtunnel',
        width: '100',
        height: '100',
      };

      // Mock res object
      const res = jasmine.createSpyObj('res', ['send', 'status', 'setHeader']);

      // Call function
      await resizeImage(req, res);

      // Assertions
      expect(res.send).toHaveBeenCalled();
      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'image/jpeg');
    });
  });

  describe('when filename is missing', () => {
    it('returns 400 error', async () => {
      const req = jasmine.createSpyObj('req', ['query']);
      req.query = {
        width: '100',
        height: '100',
      };

      // Mock res object
      const res = jasmine.createSpyObj('res', ['send', 'status', 'setHeader']);

      await resizeImage(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('Filename is required');
    });
  });
});
