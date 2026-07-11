import { render, screen } from "@testing-library/react";
import App from "./App";

test("affiche correctement la page de connexion", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { name: /HR MANAGEMENT/i })
  ).toBeInTheDocument();

  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /Se connecter/i })
  ).toBeInTheDocument();
});
