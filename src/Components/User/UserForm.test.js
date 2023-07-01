import { act, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserForm from "./UserForm";
import axios from "axios";

jest.mock("axios"); // Mock the axios module

test("renders user form for adding a user", async () => {
  // Mock the axios.get() method to return a response
  axios.get.mockResolvedValue({ data: [] });

  await act(async () => {
    render(
      <BrowserRouter>
        <UserForm />
      </BrowserRouter>
    );
  });

  // Add your assertions here
  // For example:
  const formTitle = screen.getByTestId("form-title");
  const nameInput = screen.getByLabelText("Name");
  const usernameInput = screen.getByLabelText("User Name");
  const emailInput = screen.getByLabelText("Email");
  const roleSelect = screen.getByLabelText("Role");

  expect(formTitle).toBeInTheDocument();
  expect(nameInput.value).toBe("");
  expect(usernameInput.value).toBe("");
  expect(emailInput.value).toBe("");
  expect(roleSelect.value).toBe("");
});
