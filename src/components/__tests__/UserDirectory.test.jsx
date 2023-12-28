import React from "react";
import { render } from "@testing-library/react";
import { UserDirectory } from "../../pages/UserDirectory";

describe("UserDirectory Component", () => {
    it('renders UserDirectory correctly with mock data', () => {
        const mockUsers = [
          { id: 1, name: 'John Doe', posts: 10 },
          { id: 2, name: 'Jane Doe', posts: 5 },
        ];
      
        jest.spyOn(global, 'fetch').mockImplementation(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockUsers),
          })
        );
        const { asFragment } = render(<UserDirectory />);
      
        expect(asFragment()).toMatchSnapshot();
      });      
})