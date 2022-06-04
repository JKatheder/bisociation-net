import { screen } from "@testing-library/react";
import ProjectList from "./ProjectList.js";
import axios from "axios";

jest.mock("axios");

describe("DynamicList", () => {
  const projects = [
    {
      text: "text1 ist viel zu lange daher wird das ersetzt...",
      date: "02.03.22",
      title: "Card 1",
      id: 1,
    },
    { text: "text2", date: "02.03.22", title: "Card 2: Projekt", id: 2 },
  ];
  describe("Rendering", async () => {
    it("renders all projects", () => {
      axios.get.mockResolvedValueOnce(projects);
      const result = ProjectList();

      expect(axios.get).toHaveBeenCalledWith("http://localhost:3001");

      const pageTitle = screen.getByText("My Projects");
      const title1 = screen.getByText(projects[0].title);
      const title2 = screen.getByText(projects[1].title);

      expect(pageTitle).toBeInTheDocument();
      expect(title1).toBeInTheDocument();
      expect(title2).toBeInTheDocument();
    });
  });
});
