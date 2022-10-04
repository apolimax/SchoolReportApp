import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
/* import { AuthContextProvider } from "./context/AuthContext"; */
import { AuthContext } from "./context/AuthContext";

/* import { SchoolReportContextProvider } from "./context/schoolReportContext"; */
import { SchoolReportContext } from "./context/schoolReportContext";
import * as Dialog from "@radix-ui/react-dialog";

const AllTheProviders = ({ children }) => {
  const user = {
    email: "mateus@hotmail.com",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJlNDFjOTg4YmQyMGZmMmE5NTQyYzQiLCJpYXQiOjE2NjQ1NDI2MTAsImV4cCI6MTY2NDYyOTAxMH0.DQHfGUD-XTyPvac4FHHaGu4WAn_PQXNBODfXkDSjFJY",
  };

  const reports = [
    {
      _id: "6330c95a7299dd07f5f0ea1a",
      subject: "Math",
      grade: 9,
      user_id: "632e41c988bd20ff2a9542c4",
      createdAt: "2022-09-25T21:34:18.144Z",
      updatedAt: "2022-09-26T16:16:03.691Z",
      __v: 0,
    },
    {
      _id: "6330c9557299dd07f5f0ea17",
      subject: "Geography",
      grade: 8,
      user_id: "632e41c988bd20ff2a9542c4",
      createdAt: "2022-09-25T21:34:13.372Z",
      updatedAt: "2022-09-26T16:16:19.742Z",
      __v: 0,
    },
  ];

  return (
    <AuthContext.Provider value={{ user, dispatch: jest.fn() }}>
      <SchoolReportContext.Provider value={{ reports, dispatch: jest.fn() }}>
        <BrowserRouter>
          <Dialog.Root>{children}</Dialog.Root>
        </BrowserRouter>
      </SchoolReportContext.Provider>
    </AuthContext.Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
