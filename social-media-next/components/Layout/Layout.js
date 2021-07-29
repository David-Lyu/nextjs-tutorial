import Header from './header/header';

export default function Layout(props) {
  return (
    <div className="container">
      <Header></Header>
      {props.children}
    </div>
  );
}
