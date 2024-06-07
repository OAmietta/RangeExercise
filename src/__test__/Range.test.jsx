import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Range from "../components/range/Range";
import { services } from "../services";

jest.mock("../services");

beforeEach(() => {
  services.getMinMaxValues.mockResolvedValue({ min: 10, max: 90 });
  services.getRangeValues.mockResolvedValue({ values: [10, 30, 50, 70, 90] });
});

test("renders range component with initial values", async () => {
  render(<Range />);

  const minValueInput = await waitFor(() => screen.getByTestId("min-value"));
  const maxValueInput = await waitFor(() => screen.getByTestId("max-value"));

  expect(minValueInput.value).toBe("10.00");
  expect(maxValueInput.value).toBe("90.00");
});

test("updates min value input correctly", async () => {
  render(<Range />);

  const minValueInput = await waitFor(() => screen.getByTestId("min-value"));

  fireEvent.change(minValueInput, { target: { value: "50" } });

  await waitFor(() => expect(minValueInput.value).toBe("50.00"));
});

test("updates max value input correctly", async () => {
  render(<Range />);

  const maxValueInput = await waitFor(() => screen.getByTestId("max-value"));

  fireEvent.change(maxValueInput, { target: { value: "80" } });

  await waitFor(() => expect(maxValueInput.value).toBe("80.00"));
});

test("renders with fixedValues and snaps to closest value", async () => {
  render(<Range fixedValues={true} />);

  const minValueInput = await waitFor(() => screen.getByTestId("min-value"));
  const maxValueInput = await waitFor(() => screen.getByTestId("max-value"));

  fireEvent.change(minValueInput, { target: { value: "25" } });

  await waitFor(() => expect(minValueInput.value).toBe("30.00"));

  fireEvent.change(maxValueInput, { target: { value: "75" } });

  await waitFor(() => expect(maxValueInput.value).toBe("70.00"));
});

test("prevents min value input from being greater than max value", async () => {
  render(<Range editableInputs={true} />);
  const minValueInput = await waitFor(() => screen.getByTestId("min-value"));
  const maxValueInput = await waitFor(() => screen.getByTestId("max-value"));

  fireEvent.change(maxValueInput, { target: { value: "50" } });
  fireEvent.change(minValueInput, { target: { value: "60" } });

  await waitFor(() => {
    expect(parseFloat(minValueInput.value)).toBeLessThanOrEqual(
      parseFloat(maxValueInput.value)
    );
  });
});

test("prevents max value input from being less than min value", async () => {
  render(<Range editableInputs={true} />);
  const minValueInput = await waitFor(() => screen.getByTestId("min-value"));
  const maxValueInput = await waitFor(() => screen.getByTestId("max-value"));

  fireEvent.change(minValueInput, { target: { value: "50" } });
  fireEvent.change(maxValueInput, { target: { value: "40" } });

  await waitFor(() => {
    expect(parseFloat(maxValueInput.value)).toBeGreaterThanOrEqual(
      parseFloat(minValueInput.value)
    );
  });
});

test("handles thumb drag correctly for min value", async () => {
  render(<Range />);
  const minValueInput = await waitFor(() => screen.getByTestId("min-value"));
  const sliderThumbMin = screen.getByTestId("slider-thumb-min");

  fireEvent.mouseDown(sliderThumbMin);
  fireEvent.mouseMove(sliderThumbMin, { clientX: 100 });
  fireEvent.mouseUp(sliderThumbMin);

  await waitFor(() => {
    expect(parseFloat(minValueInput.value)).toBeGreaterThanOrEqual(10);
  });
});

test("handles thumb drag correctly for max value", async () => {
  render(<Range />);
  const maxValueInput = await waitFor(() => screen.getByTestId("max-value"));
  const sliderThumbMax = screen.getByTestId("slider-thumb-max");

  fireEvent.mouseDown(sliderThumbMax);
  fireEvent.mouseMove(sliderThumbMax, { clientX: 200 });
  fireEvent.mouseUp(sliderThumbMax);

  await waitFor(() => {
    expect(parseFloat(maxValueInput.value)).toBeLessThanOrEqual(90);
  });
});
