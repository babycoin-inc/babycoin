import "../../../client/src/components/Newsfeeds/newsfeed";
//client/src/components/Newsfeeds/newsfeed.jsx"
import {render, fireEvent, screen} from '@testing-library/react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';

describe("Newsfeed component should render", () => {
  it('Should 3 newscards to ', async () => {
    render(<Newsfeed coin={"BTC"}/>);
    const titleElement = await screen.findByText(/QUESTIONS & ANSWERS/i);
    expect(titleElement).toBeInTheDocument();
  })
})