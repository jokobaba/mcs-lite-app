import React from 'react';
import {
  compose,
  pure,
  withState,
} from 'recompose';
import {
  DataChannelCard,
  DataChannelAdapter,
} from 'mcs-lite-ui';
import moment from 'moment';
import More from '../common/more';

const DisplayStringLayout = ({
  updatedAt,
  value,
  setValue,
  description,
  className,
  title,
  id,
  format,
  isPrototype,
  isDevice,
  onSubmit
}) => {
  return (
    <DataChannelCard
      className={className}
      title={title}
      subtitle={'Last data point time : ' + moment(updatedAt).format('YYYY-MM-DD h:mm')}
      description={description}
      header={
        <More
          isPrototype={isPrototype}
          isDevice={isDevice}
        />
      }
    >
      <DataChannelAdapter
        dataChannelProps={{
          id: id,
          type: 'FLOAT_CONTROL',
          values: { value: value },
          format,
        }}
        eventHandler={({type, id, values}) => {
          switch(type) {
            case 'clear':
              setValue('');
              break;
            case 'change':
              setValue(Number(values.value));
              break;
            case 'submit':
              onSubmit(id, values.value);
              break;
            default:
          }
        }}
      />
    </DataChannelCard>
  );
}

export default compose(
  pure,
  withState('value', 'setValue', (props)=> props.value || 0),
  withState('updatedAt', 'setUpdatedAt', (props)=> props.updatedAt || ''),
)(DisplayStringLayout)

