import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import NavigateBar from "../components/NavigateBar";

describe("NavigateBar Component", () => {
    const mockOnPrevious = jest.fn();
    const mockOnNext = jest.fn();

    beforeEach(() => {
        render(
            <NavigateBar
                onPrevious={mockOnPrevious}
                onNext={mockOnNext}
                currentPage={0}
                totalPages={5}
            />
        );
    });

    test("should render current page and total pages", () => {
        const countElement = screen.getByText(/1 \/ 5/i);
        expect(countElement).toBeInTheDocument();
    });

    test("should call onPrevious when previous arrow is clicked", () => {
        const previousButton = screen.getByAltText("Previous");
        fireEvent.click(previousButton);
        expect(mockOnPrevious).toHaveBeenCalled();
    });

    test("should call onNext when next arrow is clicked", () => {
        const nextButton = screen.getByAltText("Next");
        fireEvent.click(nextButton);
        expect(mockOnNext).toHaveBeenCalled();
    });
});
