import { render, screen } from "@testing-library/react";
import TodosFooter from '../../../components/TodosFooter/TodosFooter';
import TodosFooterData from '../../../__data__/TodosFooterData';

const EMPTY_TYPE = '';
const ALL_TYPE = 'all';
const ACTIVE_TYPE = 'active';
const COMPLETED_TYPE = 'completed';
const ACTIVE_CLASS = 'active';
const ITEMS_LEFT_0 = '0 items left';
const ITEMS_LEFT_1 = '1 items left';
const ITEMS_LEFT_2 = '2 items left';

describe("TodosFooter component", () => {
    it("counter should recive that left 1 active items", async () => {
        console.log('TodosFooterData');
        const { container } = render(<TodosFooter todos={TodosFooterData.todos2} selectTodosToDisplay={TodosFooterData.selectTodosToDisplay} todosType={ALL_TYPE} />);
        const counterInfo = container.querySelector("div.counter");

        expect(counterInfo.textContent).toBe(ITEMS_LEFT_1);
    });

    it("counter should recive that left 0 active items", async () => {
        const { container } = render(<TodosFooter todos={TodosFooterData.todos3} selectTodosToDisplay={TodosFooterData.selectTodosToDisplay} todosType={ALL_TYPE} />);
        const counterInfo = container.querySelector("div.counter");

        expect(counterInfo.textContent).toBe(ITEMS_LEFT_0);
    });

    it("counter should recive that left 2 active items", async () => {
        const { container } = render(<TodosFooter todos={TodosFooterData.todos4} selectTodosToDisplay={TodosFooterData.selectTodosToDisplay} todosType={ALL_TYPE} />);
        const counterInfo = container.querySelector("div.counter");

        expect(counterInfo.textContent).toBe(ITEMS_LEFT_2);
    });

    it("check ALL button if has todosType set to empty value, it should don't have class 'active'", async () => {
        render(<TodosFooter todos={TodosFooterData.todos} selectTodosToDisplay={TodosFooterData.selectTodosToDisplay} todosType={EMPTY_TYPE} />);
        const buttonAll = screen.getByText('All');

        expect(buttonAll.classList.contains(ACTIVE_CLASS)).toBeFalsy();
    });

    it("check ALL button if has todosType set to 'all' value,  it should have class 'active'", async () => {
        render(<TodosFooter todos={TodosFooterData.todos} selectTodosToDisplay={TodosFooterData.selectTodosToDisplay} todosType={ALL_TYPE} />);
        const buttonActiveAll = screen.getByText('All');

        expect(buttonActiveAll.classList.contains(ACTIVE_CLASS)).toBeTruthy();
    });

    it("check ACTIVE button if has todosType set to empty value, it should don't have class 'active'", async () => {
        render(<TodosFooter todos={TodosFooterData.todos} selectTodosToDisplay={TodosFooterData.selectTodosToDisplay} todosType={EMPTY_TYPE} />);
        const buttonAll = screen.getByText('Active');

        expect(buttonAll.classList.contains(ACTIVE_CLASS)).toBeFalsy();
    });

    it("check ACTIVE button if has todosType set to 'all' value,  it should have class 'active'", async () => {
        render(<TodosFooter todos={TodosFooterData.todos} selectTodosToDisplay={TodosFooterData.selectTodosToDisplay} todosType={ACTIVE_TYPE} />);
        const buttonActiveAll = screen.getByText('Active');

        expect(buttonActiveAll.classList.contains(ACTIVE_CLASS)).toBeTruthy();
    });

    it("check COMPLETED button if has todosType set to empty value, it should don't have class 'active'", async () => {
        render(<TodosFooter todos={TodosFooterData.todos} selectTodosToDisplay={TodosFooterData.selectTodosToDisplay} todosType={EMPTY_TYPE} />);
        const buttonAll = screen.getByText('Completed');

        expect(buttonAll.classList.contains(ACTIVE_CLASS)).toBeFalsy();
    });

    it("check COMPLETED button if has todosType set to 'all' value,  it should have class 'active'", async () => {
        render(<TodosFooter todos={TodosFooterData.todos} selectTodosToDisplay={TodosFooterData.selectTodosToDisplay} todosType={COMPLETED_TYPE} />);
        const buttonActiveAll = screen.getByText('Completed');

        expect(buttonActiveAll.classList.contains(ACTIVE_CLASS)).toBeTruthy();
    });
})
