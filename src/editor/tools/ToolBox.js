import SelectTool from "./SelectTool";
import TransformTool from "./TransformTool";


export default class ToolBox{
    
    static TOOLTYPE = {
        SELECTBOX: 0,
        CURSOR: 1,
        TRANSFORM: 2,
        MOVE: 3,
        ROTATE: 4,
        SCALE: 5,
        MEASURE: 7,
        ADDCUBE: 8
    };

    constructor(viewport){
        this.activeTool = ToolBox.TOOLTYPE.SELECTBOX;
        this.viewport = viewport;

        this.toolProperties = {
            select:true,
            move: false,
            rotate: false,
            scale: false
        };

        this.selectTool = new SelectTool();
        this.transformTool = new TransformTool(viewport, viewport.controlledCamera, viewport.domElement);

        this.viewport.onIntersectedObject = (object)=>{
            if(object.type == 'InteractiveMesh'){
                switch(this.activeTool){
                    case ToolBox.TOOLTYPE.SELECTBOX:
                        this.selectTool.add(object);
                        break;
                }
            }else{
                if(this.activeTool === ToolBox.TOOLTYPE.SELECTBOX){
                    this.selectTool.deactivate();
                }
            }
        };

    
        window.addEventListener('keypress', event=>{
            if(this.selectTool.selected.length > 0){
                switch(event.code){
                    case 'KeyB':
                        this.activate(ToolBox.TOOLTYPE.SELECTBOX);
                    case 'KeyG':
                        this.activate(ToolBox.TOOLTYPE.MOVE);
                        break;
                    case 'KeyR':
                        this.activate(ToolBox.TOOLTYPE.ROTATE);
                        break;
                    case 'KeyS':
                        this.activate(ToolBox.TOOLTYPE.SCALE);
                        break;
                }
            }
        });
    }

    setMode(toolName){
        for(let tool in this.toolProperties){
            this.toolProperties[tool] = false;
        }
        this.toolProperties[toolName] = true;
    }

    activate(toolType){
        if(this.activeTool == toolType)return;
        this.activeTool = toolType;
        switch(toolType){
            case ToolBox.TOOLTYPE.SELECTBOX:
                this.setMode('select');
                this.deactivate();
                break;
            case ToolBox.TOOLTYPE.MOVE:
                this.activateTransformTool('translate');
                break;
            case ToolBox.TOOLTYPE.ROTATE:
                this.activateTransformTool('rotate');
                break;
            case ToolBox.TOOLTYPE.SCALE:
                this.activateTransformTool('scale');
                break;
        }
    }

    activateTransformTool(type){
        this.viewport.disableOrbitControls();
        this.setMode(type);
        this.transformTool.setMode(type);
        if(this.selectTool.selected.length > 0){
            this.transformTool.activate(this.selectTool.selected);
        }
    }

    deactivate(){
        this.viewport.enableOrbitControls();
        if(this.activeTool !== ToolBox.TOOLTYPE.TransformTool){
            this.activeTool = ToolBox.TOOLTYPE.SELECTBOX;
            this.transformTool.deactivate();
        }
    }

    
}

