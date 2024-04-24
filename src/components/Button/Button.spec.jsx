const { render, screen, fireEvent } = require("@testing-library/react");
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('<Button />', () => {
    it('should render the button with the text', () => {
        render(<Button text={'Load more'}/>);

        const button = screen.getByRole('button', { name: /load more/i})

        expect(button).toBeInTheDocument();
    })

    it('should call function on button click', () => {
        // criando mock da função

        const fn = jest.fn()
        render(<Button text='Load more' onClick={fn}/>);

        const button = screen.getByRole('button', { name: /load more/i})
        userEvent.click(button)

        expect(fn).toHaveBeenCalledTimes(1)
    })
    
    it('should be disabled when disabled is true', () => {
        // criando mock da função
        const fn = jest.fn()

        render(<Button text='Load more' onClick={fn} disabled={true} />);
        const button = screen.getByRole('button', { name: /load more/i})

        expect(button).toBeDisabled();
    })

    it('should be enabled when disabled is false', () => {
        // criando mock da função
        const fn = jest.fn()

        render(<Button text='Load more' onClick={fn} disabled={false} />);
        const button = screen.getByRole('button', { name: /load more/i})

        expect(button).toBeEnabled();
    })
})