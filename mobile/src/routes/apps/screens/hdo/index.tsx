import React from 'react';
import {SourceType, useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {ScrollView} from 'react-native';
import {Content, Steps} from './components/content';
import Step from './components/step';
import SpeedDial from '../../components/speedDial';
import InfoCollapse from '../../components/infoCollapse';

export type Variants = 'What Is HDO BOX?' | 'Why HDO BOX?';

type ExpandedVariants = null | Variants;

export default function AppsHDO() {
  const source = useSource()[0];
  const [expanded, setExpanded] = React.useState<ExpandedVariants>(null);
  const [downloadData, setDownloadData] = React.useState<{
    open: boolean;
    source: null | SourceType;
  }>({open: false, source: null});
  return (
    <>
      <ScrollView>
        <ScreenBase
          source={source.HDO}
          downloadData={downloadData}
          setDownloadData={setDownloadData}>
          <InfoCollapse
            isExpanded={expanded === 'What Is HDO BOX?'}
            onPress={() =>
              setExpanded(prev =>
                prev === 'What Is HDO BOX?' ? null : 'What Is HDO BOX?',
              )
            }
            title="What Is HDO BOX?"
            content={Content['What Is HDO BOX?']}
          />
          <InfoCollapse
            isExpanded={expanded === 'Why HDO BOX?'}
            title="Why HDO BOX?"
            onPress={() =>
              setExpanded(prev =>
                prev === 'Why HDO BOX?' ? null : 'Why HDO BOX?',
              )
            }
            content={Content['Why HDO BOX?']}
          />
          {Steps.map((step, index) => (
            <Step key={index} {...step} />
          ))}
        </ScreenBase>
      </ScrollView>
      <SpeedDial setDownloadData={setDownloadData} source={source.HDO} />
    </>
  );
}
