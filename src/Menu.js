import React, { Component } from 'react';
import ColorPicker from 'react-color-picker';
import 'react-color-picker/index.css';
import Dropdown from './Dropdown';
import Positioning from './Positioning';
import '../public/css/Menu.css';
import '../public/css/popup.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {color: 'white', className: '', imageUrl: ''};
    this.handleClassName = this.handleClassName.bind(this);
    this.handleNewDiv = this.handleNewDiv.bind(this);
    this.handleNewTitle = this.handleNewTitle.bind(this);
    this.handleNewParagraph = this.handleNewParagraph.bind(this);
    this.handleNewImage = this.handleNewImage.bind(this);
    this.handleImageUrl = this.handleImageUrl.bind(this);
    this.increaseBorderWidth = this.increaseBorderWidth.bind(this);
    this.decreaseBorderWidth = this.decreaseBorderWidth.bind(this);
    this.setBorderRadius = this.setBorderRadius.bind(this);
    this.setDivWidth = this.setDivWidth.bind(this);
    this.setDivHeight = this.setDivHeight.bind(this);
  }

  render () {
    var colourBoxStyle = {background: this.state.color, width: 100, height: 50, color: 'white', borderWidth: "3px", borderStyle: "solid", borderColor: "#000"};
    if (this.props.parentContainer === "background") {
      return (
        <div className="menu">
          <ColorPicker value={this.state.color} onDrag={this.onDrag.bind(this)}/>
          <div style={colourBoxStyle}>
            {this.state.color}
          </div>
          <div className="createsection">
             <h3>Create section</h3>
             <input id="classInput" type="text" name="className" placeholder="Div class name" onChange={this.handleClassName}/>
             <button id="newDiv" className="textbutton" onClick={this.handleNewDiv}>Create new section</button>
           </div>
        </div>
      )
    } else {
      return (
        <div className="menu">
          <div className="colorpickerdiv">
            <ColorPicker value={this.state.color} onDrag={this.onDrag.bind(this)}/>
            <div style={colourBoxStyle}>
              {this.state.color}
            </div>
          </div>
          <div className="sections">
            <h3>Add content</h3>
            <div className="settingSection">
              <h5>Create new section:</h5>
              <input id="classInput" type="text" name="className" placeholder="Section name" onChange={this.handleClassName}/>
              <button id="newDiv" className="textbutton" onClick={this.handleNewDiv}>Create new section</button>
            </div>
            <div id="textDiv">
              <div id="addText" className="settingSection">
                <h5>Add text:</h5>
                <button id="newTitle" className="textbutton" onClick={this.handleNewTitle}>Add title</button>
              </div>
              <div id="addParagraph" className="settingSection">
                <button id="newParagraph" className="textbutton" onClick={this.handleNewParagraph}>Add paragraph</button>
              </div>
            </div>
            <div className="settingSection">
              <h5>Insert image link:</h5>
              <input id="imageInput" type="text" name="imageUrl" placeholder="Image url" onChange={this.handleImageUrl}/>
              <button id="newImage" className="textbutton" onClick={this.handleNewImage}>Insert image</button>
            </div>
          </div>

          <div className="dimensions">
            <h3>Set the dimensions</h3>
            <div id="widthDiv" className="settingSection">
              <h5>Section width:</h5>
              <input id="divWidthInput" type="number" name="width" placeholder="Set section width" onChange={this.setDivWidth}/>%
            </div>
            <div id="heightDiv" className="settingSection">
              <h5>Section height:</h5>
              <input id="divHeightInput" type="number" name="height" placeholder="Set section height" onChange={this.setDivHeight}/>%
            </div>
          </div>

          <div className="settingPositioning">
            <Positioning changeAlignment={this.props.changeAlignment} changeMargin={this.props.changeMargin} />
          </div>

          <div className="borderstyle">
            <h3>Border</h3>
            <div id="borderWidthDiv" className="settingBorder">
              <h5>Width:</h5>
              <button id="increaseBorderWidth" className="resize" onClick={this.increaseBorderWidth}>+</button>
              <button id="decreaseBorderWidth" className="resize" onClick={this.decreaseBorderWidth}>-</button>
            </div>
            <div id="borderStyleDiv" className="settingBorder">
              <h5>Style:</h5>
              <Dropdown id="borderStyleDropdown" items={["Solid", "Dashed", "Dotted"]} eventHandler={this.props.changeBorderStyle}/>
            </div>
            <div id="borderRadiusDiv" className="settingBorder">
              <h5>Radius:</h5>
              <input id="borderRadius" type="number" name="radius" placeholder="Border radius" onChange={this.setBorderRadius}/>
            </div>
            <div id="borderColorDropdown" className="settingBorder">
              <h5>Color:</h5>
              <Dropdown items={["Black", "Dark grey", "Light grey", "Transparent"]} eventHandler={this.props.changeBorderColor}/>
            </div>
          </div>
        </div>
      );
    }
  }

  handleNewImage() {
    this.props.addChildImage(this.state.imageUrl)
  }

  handleImageUrl(e) {
    this.setState({imageUrl: e.target.value});
  }

  handleNewTitle() {
    this.props.addChildText("h1");
  }

  handleNewParagraph() {
    this.props.addChildText("p");
  }

  handleClassName(e) {
    this.setState({className: e.target.value});
  }

  handleNewDiv () {
    this.props.addChildDiv(this.state.className)
  }

  onDrag (color, c) {
    this.props.onDrag(color);
    this.setState({color: color});
  }

  increaseBorderWidth () {
    this.props.changeBorderWidth(1);
  }

  decreaseBorderWidth () {
    this.props.changeBorderWidth(-1);
  }

  setBorderRadius(e) {
    this.props.changeBorderRadius(e.target.value);
  }

  setDivWidth(e) {
    this.props.updateDivSize(e.target.value, "width");
  }

  setDivHeight(e) {
    this.props.updateDivSize(e.target.value, "height");
  }

}

export default Menu;
