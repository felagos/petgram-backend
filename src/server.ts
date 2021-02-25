import "./alias";

import App from '@app';
import { environment } from '@env';

App.listen(environment.PORT, () => {
    console.log(`Server up ${environment.PORT} !`);
});
