import {Checkbox} from "../atoms/Checkbox";
import React, {Fragment} from "react";
import SortableColumnHeader from "../atoms/SortableColumnHeader";

export const ResultsTable = (props) => {
  
  const {Components, appliedColumns, results, sort, resultKeyName, hasFirstColumn, renderFirstColumnHeader, renderFirstColumn, renderFirstColumnMobile} = props;
  
  const renderDynamicComponent = (result, column) => {
    const { component, field, valueFn, formatValueFn} = column;
    let props = column.props;
    if (!props) {
      props = {};
    }
    let value = result[field];
    if (component == 'text') {
      if (formatValueFn && typeof formatValueFn == 'function') {
        return (<>{formatValueFn(value)}</>);
      } else {
        return (<>{result[field]}</>);
      }
    } else if (component == 'textCollection') {
      return (<>{result[field]?.map((value, indx) => {
        return <React.Fragment key={`value_${field}_${indx}-${result["urihash"]}`}>{`${indx !== 0 ? ', ' : ''}${value}`}</React.Fragment>
      })}</>)
    }
    const CellComponent = Components[component];
    
    if (valueFn && typeof valueFn == 'function') {
      value = valueFn(result, field);
    }
    return CellComponent ? <CellComponent value={value} {...props} /> : (<>{result[field]}</>);
  }
  
  const renderHeaders = () => {
    return (
      <tr>
        {hasFirstColumn && (<th>
          {renderFirstColumnHeader()}
        </th>)}
        {appliedColumns?.filter(column => !column.hidden).map((column, index) => (
          <React.Fragment key={`column_header_${index}`}>
            {column.sortable == true &&
              (<th>
                <SortableColumnHeader
                name={column.name}
                field={column.field}
                order={sort.fields[column.field]}/>
              </th>)
            }
            {column.sortable != true &&
              (<th>{column.name}</th>)}
          </React.Fragment>
        ))}
      </tr>
    );
  };
  
  return (
    <table>
      <thead>
      {renderHeaders()}
      </thead>
      <tbody>
      {results.map(result => (
        <tr key={result[resultKeyName]}>
          {hasFirstColumn && (<td className={'first-column'}>
            {renderFirstColumn(result)}
          </td>)}
          {appliedColumns?.filter(column => !column.hidden).map((column, index) => (
            <td className={column.field}  
            data-th={(column.mobileName ?? column.name) + "   "}
                key={`result-column-${index}`}>
              {index == 0 && hasFirstColumn && (
                <>{renderFirstColumnMobile(result, result[column.field])}</>
              )}
              {renderDynamicComponent(result, column)}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}

