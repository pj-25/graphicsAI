import PropertyController from "./propertyController";

export default class ConeProperty extends PropertyController{
    constructor(interactiveMesh){
        super(interactiveMesh);
        this.geometryData = this.interactiveMesh.geometry.parameters;
        this.coneFolder = this.propertiesPane.addFolder('Add Cone');
    }

    initConeProperties(){
        this.coneFolder.add(this.geometryData,'radius').min(1).max(10).onChange(this.regenerate);
        this.coneFolder.add(this.geometryData,'height').min(1).max(10).onChange(this.regenerate);
        this.coneFolder.add(this.geometryData,'radialSegments').min(1).max(10).onChange(this.regenerate);
        this.coneFolder.add(this.geometryData,'heightSegments').min(1).max(10).onChange(this.regenerate);
        this.coneFolder.add(this.geometryData,'openEnded').onChange(onChange(()=>{
            if(!this.geometryData.visible){
                this.transformControls.detach();
            }else{
                if(!this.transformControls.visible && this.selected){
                    this.transformControls.attach(this.geometryData);
                }
            }
        }));        
        this.coneFolder.add(this.geometryData,'thetaStart').min(1).max(10).onChange(this.regenerate);
        this.coneFolder.add(this.geometryData,'thetaLength').min(1).max(10).onChange(this.regenerate);

    }
    
    regenerate(){
        let newGeometry = new THREE.ConeGeometry(this.geometryData.radius, 
                                                this.geometryData.height, 
                                                this.geometryData.radidalSegments, 
                                                this.geometryData.heightSegments, 
                                                this.geometryData.openEnded, 
                                                this.geometryData.thetaStart, 
                                                this.geometryDatathetaLength);
        
        this.updateMesh(newGeometry);

    }
}