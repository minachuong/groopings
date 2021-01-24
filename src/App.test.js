import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('When App is rendered', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('displays the initial state correctly', () => {
    const namesLabel = screen.getByLabelText('Add names');
    expect(namesLabel).toBeInTheDocument();

    const newLineDescription = screen.getByPlaceholderText('Enter each name on a new line');
    expect(newLineDescription).toHaveFocus();

    const randomizeListButton = screen.getByRole('button', {name: 'Randomize List'});
    expect(randomizeListButton).toBeInTheDocument();

    const customizeGroopingsHeader = screen.getByRole('heading', {name: 'Customize Groopings'});
    expect(customizeGroopingsHeader).toBeInTheDocument();

    const groopSizeLabel = screen.getByLabelText('Groop Size');
    expect(groopSizeLabel).toBeInTheDocument();

    const groopSizeInput = screen.getByDisplayValue('2');
    expect(groopSizeInput).toBeInTheDocument();

    const createGroopingsButton = screen.getByRole('button', {name: 'Create Groopings'});
    expect(createGroopingsButton).toBeInTheDocument();
  });

  describe('And when the user adds a list of names', () => {
    beforeEach(() => {
      const namesTextArea = screen.getByRole('textbox');
      userEvent.type(namesTextArea, 'Patrick{enter}Churro{enter}Mina{enter}Patricio{enter}La Mina{enter}Churroro{enter}Churrito');
    });

    describe('And the user clicks Randomize List', () => {
      beforeEach(() => {
        const randomizeListButton = screen.getByRole('button', {name: 'Randomize List'}); 
        userEvent.click(randomizeListButton);
      });
  
      it('displays a list of randomized names', () => {
        const randomizedListHeader = screen.getByRole('heading', {name: 'Randomized List'});
        expect(randomizedListHeader).toBeInTheDocument(); 
  
        const randomizedNames = screen.getAllByRole('listitem');
        expect(randomizedNames.length).toEqual(7);
        
        const expectedNames = ['Churro', 'Mina', 'Patrick', 'Patricio', 'La Mina', 'Churroro', 'Churrito'];
        expectedNames.forEach((name) => {
          expect(screen.getByText(name)).toBeInTheDocument();
        });
      });
    });

    describe('And the user clicks Create Groopings', () => {
      beforeEach(() => {
        const createGroopingsButton = screen.getByRole('button', {name: 'Create Groopings'}); 
        userEvent.click(createGroopingsButton);
      });

      it('displays the correct number of groopings', () => {
        const groopingsHeader = screen.getByRole('heading', {name: 'Groopings'});
        expect(groopingsHeader).toBeInTheDocument();

        const expectedGroops = ['Groop 1', 'Groop 2', 'Groop 3'];
        expectedGroops.forEach((groop) => {
          expect(screen.getByRole('heading', {name: groop})).toBeInTheDocument();
        });

        const firstGroop = screen.getByRole('list', {name: 'Groop 1'});
        expect(firstGroop).toBeInTheDocument();
      });
    });
  });
});
