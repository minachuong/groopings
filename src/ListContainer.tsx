interface Props {
  id?: string;
  title: string;
  children: any;
}

function ListContainer(props: Props) {
  return (
    <section>
      <h2 id={props.id}>{props.title}</h2>
      {props.children} 
    </section>
  );
}

export default ListContainer;