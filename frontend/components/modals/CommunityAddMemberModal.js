import React from 'react';

class CommunityAddMemberModal extends React.Component {
  constructor(props){
    super(props);

  }

  render(){
    return(
      <Modal show={this.state.showModal} onHide={() => this.close()}>
        <Modal.Header closeButton>
          <Modal.Title>More neighbors! More fun!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <ControlLabel>Add members</ControlLabel>
              <Autosuggest
                ref={(input) => {this.input = input;}}
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                getSuggestionValue={this.getSuggestionValue.bind(this)}
                renderSuggestion={this.renderSuggestion.bind(this)}
                inputProps={inputProps}
              />
              <Button onClick={(e) => this.onAdd(e)}>Add</Button>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.close()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
    <Modal show={this.state.showModal} onHide={() => this.close()}>
      <Modal.Header closeButton>
        <Modal.Title>More neighbors! More fun!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>
            <ControlLabel>Add memebers</ControlLabel>
            <Autosuggest
              ref={(input) => {this.input = input;}}
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
              getSuggestionValue={this.getSuggestionValue.bind(this)}
              renderSuggestion={this.renderSuggestion.bind(this)}
              inputProps={inputProps}
            />
            <Button onClick={(e) => this.onAdd(e)}>Add</Button>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => this.close()}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
  }
}
