
import { SortableContainer, SortableElement , arrayMove } from 'react-sortable-hoc';

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
        { items.map( ( value , index ) => (
            <SortableItem key={`item-${index}`} id={ value._id } obj={ value } />
        ))}
    </ul>
  );
});

const SortableItem = SortableElement(({ obj , id }) =>
  <li> { obj.sectionName } </li>
);

const MovableSelection = ( props ) => {

      const onSortEnd = ( { oldIndex, newIndex } ) => {
           let sortedItems = arrayMove( items , oldIndex, newIndex);
           let newSorted = sortedItems.forEach( ( each , index ) => each.index = index + 1 );
           setItems( sortedItems );
           console.log( sortedItems );
      };

      return (
        <div>
            { items == null ? <h1> </h1> :
            <SortableList items={ orderSections } onSortEnd={ onSortEnd } /> }
        </div>
      )
}
