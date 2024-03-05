### Scripts

- Install: `npm install`
- Build: `npm run build`
- Lint: `npm run lint`
- Prettify: `npm run prettier`
- Run unit tests: `npm run test`
- Start server: `npm run start`

### How to use

Server listening on port 3000

#### Instructions

http://localhost:3000/

#### Endpoint to resize images

http://localhost:3000/api/images

Expected arguments are:

- _filename_: Available filenames are:
  - encenadaport
  - fjord
  - icelandwaterfall
  - palmtunnel
  - santamonica
- _width_: value > 0
- _height_: value > 0

#### Example

http://localhost:3000/api/images?filename=palmtunnel&width=200&height=200
