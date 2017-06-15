import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class RegistrationSuccessForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <div><span>Rejestracja powiodła się!</span></div>
        <Button type="submit">
          <Link to={'/search'}>
            Przejdź do wyszukiwarki
          </Link>
        </Button>
      </div>
    )
  }
}

export default RegistrationSuccessForm