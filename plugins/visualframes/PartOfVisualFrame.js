import React from 'react'

import {PartWhole} from 'odp-reactor-visualframes'
import { routeToResource } from '../../components/route/routeToResource'
import { PropertyList } from '../../components/propertylist/PropertyList';
import { PropertyValueList } from '../../components/propertylist/PropertyValueList';


const defaultPartWholeStyle = {
    containerStyle: {
        width: 700
    },
    littleItemStyle: {
        width: 100
    },
    centerItemStyle: {
        width: 500
    }
};

export default class PartOfVisualFrame extends React.Component {

    render() {

        if (!this.props.patternInstance || !this.props.patternInstance.data) {
            return null
        }

        const getVisualFrameContainerWidth = () => {
            const browserWidth = window.innerWidth
            const widthAtWhichMultiCellGridBecomeSingleCell = 768
            if (browserWidth > widthAtWhichMultiCellGridBecomeSingleCell) {
                return browserWidth
            } else {
                return browserWidth * 2
            }
        }

        const visualFrameContainerWidth = getVisualFrameContainerWidth()

        const partOfContainerWidth = visualFrameContainerWidth * 1.8 / 5
        const centerItemWidth = partOfContainerWidth * 3 / 5
        const littleItemWidth = partOfContainerWidth * 1 / 5

        const partWholeStyle = this.props.isMosaicFrameView ? {

            containerStyle : {
                width: partOfContainerWidth
            },
            littleItemStyle : {
                width: littleItemWidth
            },
            centerItemStyle : {
                width: centerItemWidth
            }
        } : defaultPartWholeStyle

        const data = this.props.patternInstance.data

        if (data) {
            const whole = { uri: data[0].complexCProp, source: this.props.dbContext.sparqlEndpoint };

            let parts = data.map(part => {
                return { uri: part.cPropComponent, source: this.props.dbContext.sparqlEndpoint };
            });

            parts = [...new Set(parts)]; //clean duplicate values

            const datasetId = this.props.dbContext.getDataset()

            const routeToDatasetResource = (resourceUri) => {
                routeToResource(datasetId, resourceUri)
            }

            const propertyValueList = new PropertyValueList()
            let c = 1
            data.forEach(part => {
                propertyValueList.addProperty(`Component ${c} :`, {
                    uri: part.cPropComponent,
                    onClick : () => {
                        routeToDatasetResource(part.cPropComponent)
                    }
                })
                c++
            })

            const sparqlEndpoint = this.props.dbContext.getSparqlEndpoint()



            return (
                <div>
                    <div style={{ textAlign: 'center', margin: 'auto' }}>
                        <PartWhole
                            parts={parts}
                            whole={whole}
                            onResourceClick={routeToDatasetResource}
                            styles={partWholeStyle}
                        />
                    </div>
                    <div style={{ marginTop: 50, marginBottom: 50 }}>
                        <PropertyList
                            propertyValueList={propertyValueList}
                            source={sparqlEndpoint}
                        />
                    </div>
                </div>
            );
        }
    }
}


