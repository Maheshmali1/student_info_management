import { createServer } from './utils';

const app = createServer();

app.listen(3000,()=>{
	console.log('server listening on port 3000..');
});