import { authenticate } from "../middelware/auth.middleware";

const routesInits = (app, passport) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      sucessRedirect: "/user",
    }),
    (req, res) => {
      console.log("User authenticated");
    }
  );
  app.get("/test", authenticate, (req, res) => {
    res.send("<h3>User is authenticated</h3>");
  });
};
export { routesInits };
