import React, {  useState , useEffect , Fragment } from 'react';
import { useStoreState , useStoreActions } from 'easy-peasy';

import './snippets.scss';

const Tooltip = ( { hoverItem , text , tag } ) => {

    const [ tooltipOpen , setTooltip ] = useState(false);

    const CustomTag = tag;

    return (
      <Fragment>
          <CustomTag className="tooltip"> { hoverItem }
            <span className="tooltiptext"> { text } </span>
          </CustomTag>
      </Fragment>
    )
}
export default Tooltip;
