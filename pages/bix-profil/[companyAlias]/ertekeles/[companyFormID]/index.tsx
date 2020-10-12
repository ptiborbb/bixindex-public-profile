import { createAuthRouteComponent } from '../../../../../shared/utils/auth-route';
import { Rating } from '../../../../../shared/pages/rating/rating';
import { createNoAuthRouteComponent } from '../../../../../shared/utils/no-auth-route';

export default createNoAuthRouteComponent(Rating);
