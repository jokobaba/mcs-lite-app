import React from 'react';

import Breadcrumb from './breadcrumb';
import PanelContent from './panelContent';
import PrototypeDetailHeader from './header';
import PrototypeDetailInfo from './info';

import styles from './styles.css';

const Prototypes = ({
  prototypes,
  createTestDevice,
  createDataChannel,
  deleteDataChannel,
  retrieveUnitTypes,
  createUnitTypes,
  pushToast,
  ...props
}) => {
  const {
    prototypeName,
    version,
    prototypeDescription,
    prototypeId,
    devicesLength,
    datachannels,
    devices,
  } = prototypes.prototypeDetail;
  const { unitTypes } = prototypes;
  return (
    <div>
      <div className={styles.base}>
        <Breadcrumb prototypeName={prototypeName} />
        <PrototypeDetailHeader
          prototypeId={prototypeId}
          prototypeName={prototypeName}
          version={version}
          createTestDevice={createTestDevice}
          {...props}
        />
        <PrototypeDetailInfo
          prototypeDescription={prototypeDescription}
          devicesLength={devicesLength}
        />
        <PanelContent
          createTestDevice={createTestDevice}
          devices={devices}
          datachannels={datachannels}
          createDataChannel={createDataChannel}
          deleteDataChannel={deleteDataChannel}
          prototypeId={prototypeId}
          retrieveUnitTypes={retrieveUnitTypes}
          createUnitTypes={createUnitTypes}
          unitTypes={unitTypes}
          pushToast={pushToast}
        />
      </div>
    </div>
  );
};

export default Prototypes;
