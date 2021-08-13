import Header from './header/Header/header';

export default function Layout(props) {
  return (
    <div className="container">
      <Header></Header>
      {props.children}
    </div>
  );
}
