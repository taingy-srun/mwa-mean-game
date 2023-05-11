import { ErrorPageComponent } from "./error-page/error-page.component";
import { GameComponent } from "./game/game.component";
import { GamesComponent } from "./games/games.component";
import { HomeComponent } from "./home/home.component";

export const AppRoute = [
    {
      path: "",
      component: HomeComponent
    },
    {
      path: "games",
      component: GamesComponent
    },
    {
      path: "games/:id",
      component: GameComponent
    },
    {
      path: "**",
      component: ErrorPageComponent
    }
];