import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('When App is rendered', () => {
  beforeEach(() => {
    render(<App />);
  });

  afterEach(() => {
    cleanup();
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

    const groopBySizeToggle = screen.getByRole('checkbox', {name: 'Groop by size'});
    expect(groopBySizeToggle).toBeChecked();

    const groopSizeInput = screen.getByRole('spinbutton', {name: 'Groop Size'});
    expect(groopSizeInput).toHaveDisplayValue(['2']);
    expect(groopSizeInput).toBeEnabled();

    const numberOfGroopsInput = screen.getByRole('spinbutton', {name: 'Number of Groops'});
    expect(numberOfGroopsInput).toHaveDisplayValue(['2']);
    expect(numberOfGroopsInput).toBeDisabled();

    const createGroopingsButton = screen.getByRole('button', {name: 'Create Groopings'});
    expect(createGroopingsButton).toBeInTheDocument();
  });

  it('When the user adds a list of names, the Groop Size input provides the maximum number of groopings that can be created', () => {
    const namesTextArea = screen.getByRole('textbox');
    userEvent.type(namesTextArea, 'Patrick{enter}Churro{enter}Mina{enter}Patricio{enter}La Mina{enter}Churroro{enter}Churrito');

    const groopSizeInput = screen.getByRole('spinbutton', {name: 'Groop Size'});
    expect(groopSizeInput).toHaveAttribute('max', '7');
  });

  describe('When the user adds a list of names And the user clicks Randomize List', () => {
    it('displays a list of randomized names', () => {
      const namesTextArea = screen.getByRole('textbox');
      userEvent.type(namesTextArea, 'Patrick{enter}Churro{enter}Mina{enter}Patricio{enter}La Mina{enter}Churroro{enter}Churrito');

      const randomizeListButton = screen.getByRole('button', {name: 'Randomize List'}); 
      userEvent.click(randomizeListButton);

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

  describe('When the user adds a list of names And the user clicks Create Groopings', () => {
    it('displays the correct number of groopings', () => {
      const namesTextArea = screen.getByRole('textbox');
      userEvent.type(namesTextArea, 'Patrick{enter}Churro{enter}Mina{enter}Patricio{enter}La Mina{enter}Churroro{enter}Churrito');
      
      const createGroopingsButton = screen.getByRole('button', {name: 'Create Groopings'}); 
      userEvent.click(createGroopingsButton);

      const groopingsHeader = screen.getByRole('heading', {name: 'Groopings'});
      expect(groopingsHeader).toBeInTheDocument();

      const expectedGroops = ['Groop 1', 'Groop 2', 'Groop 3'];
      expectedGroops.forEach((groop) => {
        expect(screen.getByRole('heading', {name: groop})).toBeInTheDocument();
        expect(screen.getByLabelText(groop, {selector: 'ul'})).toBeInTheDocument();
      });

      // TODO: how do I assert that the first group has 3 children? 
      const expectedNames = ['Churro', 'Mina', 'Patrick', 'Patricio', 'La Mina', 'Churroro', 'Churrito'];
      expectedNames.forEach((name) => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });
  });
});
