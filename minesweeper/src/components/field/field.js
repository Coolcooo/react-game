import React from 'react';
import './field.scss';
import Cell from "../cell";
import leftClick from '../../assets/sounds/left-click.mp3';
import rightClick from '../../assets/sounds/right-click.mp3';


const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
}

const arrToSqrMatrix = (arr) => {
  const size = arr.length ** 0.5;
  const matrix = [...[...Array(size)].map(() => [])];
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      matrix[i].push(arr[i * size + j]);
    }
  }
  return matrix;
}

const addNumbers = (sqrMatrix) => {
  for (let i = 0; i < sqrMatrix.length; i += 1) {
    for (let j = 0; j < sqrMatrix.length; j += 1) {
      if (sqrMatrix[i][j] === 'dangerous') {
        for (let k = -1; k <= 1; k += 1) {
          for (let c = -1; c <= 1; c += 1) {
            const isColumnRange = (i + k >= 0) && (i + k < sqrMatrix.length);
            const isRowRange = (j + c >= 0) && (j + c < sqrMatrix.length);

            if (isColumnRange && isRowRange) {
              const isNotMine = !((k === 0 && c === 0) || (sqrMatrix[i + k][j + c] === 'dangerous'));

              if (isNotMine) {
                sqrMatrix[i + k][j + c] = sqrMatrix[i + k][j + c] + 1;
              }
            }
          }
        }
      }
    }
  }
}

const createMinesweeperField = () => {
  const randomCells = shuffle([...Array(9).fill('dangerous'), ...Array(72).fill(0)]);
  const matrix = arrToSqrMatrix(randomCells);
  addNumbers(matrix);
  return matrix;
}

const doSmileLose = () => {
  const smileRestart = document.querySelector('.button-smile');
  smileRestart.classList.remove('button_restart-good');
  smileRestart.classList.add('button_restart-bad');
}
const doSmileWin = () => {
  const smileRestart = document.querySelector('.button-smile');
  smileRestart.classList.remove('button_restart-good');
  smileRestart.classList.add('button_restart-win');
}
const doSmileRestart = () => {
  const smileRestart = document.querySelector('.button-smile');
  smileRestart.classList.remove('button_restart-bad', 'button_restart-win');
  smileRestart.classList.add('button_restart-good');
}

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellsValue: createMinesweeperField(),
      countOfCells: 72,
    }
  }

  leftClickSound = new Audio(leftClick);
  rightClickSound = new Audio(rightClick);
  countOfCells = 72;
  isFinished = false;
  isLose = false;

  componentDidMount() {

    document.body.addEventListener('keydown', (e) => {
      if (e.code === 'KeyR') {
        this.restart();
      }
    });
    document.querySelector('.button-smile').addEventListener('click', () => {
      this.restart();
    });
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    this.leftClickSound.volume = this.props.soundVolume;
    this.rightClickSound.volume = this.props.soundVolume;
  }

  openHidEmptyCell = (p) => {
    if (p.childNodes[0].classList.contains('cell_hidden') && p.innerText !== 'dangerous') {
      if (p.childNodes[0].classList.contains('cell_flag')) {

      }
      p.childNodes[0].classList.remove('cell_hidden', 'cell_flag');
      this.countOfCells -= 1;
      if (this.countOfCells === 0) {
        this.isFinished = true;
        doSmileWin();
        this.props.stopTime();
        this.props.addBestResult(this.props.time);
      }
      if (p.innerText !== '') {
        return;
      }

      const cell = p;
      const dataposOfCell = cell.getAttribute('datapos');
      const [i, j] = dataposOfCell.split(' ').map((p) => parseFloat(p));
      for (let k = -1; k <= 1; k += 1) {
        for (let c = -1; c <= 1; c += 1) {
          const isColumnRange = (i + k >= 0) && (i + k < 9);
          const isRowRange = (j + c >= 0) && (j + c < 9);
          if (isColumnRange && isRowRange) {
            const fil = document.querySelector('.field');
            fil.childNodes.forEach((epo) => {
              if (epo.getAttribute('datapos') === `${i + k} ${j + c}`) {
                this.openHidEmptyCell(epo);
              }
            });
          }
        }
      }
    }
  }


  restart = () => {
    this.countOfCells = 72;
    const newCellsValue = createMinesweeperField();
    this.isFinished = false;
    document.querySelectorAll('.cell').forEach((e) => {
      e.classList.add('cell_hidden');
      e.classList.remove('cell_flag');
    });
    this.setState({cellsValue: newCellsValue});
    const cellsOfFlag = document.querySelectorAll('.cell_flag');
    this.props.removeFlag(9 - (this.props.countOfFlags + cellsOfFlag.length));
    this.props.stopTime();
    this.props.resetTime();
    doSmileRestart();
    this.props.startTime();
  }




  openHiddenCell = (e) => {
    if (this.isFinished) {
      return;
    }
    if (this.props.isSoundPlay) {
      this.leftClickSound.play();
    }
    if (e.target.closest('.cell-wrapper')) {
      if (e.target.closest('.cell_hidden')) {
        if (e.target.closest('.cell_hidden').classList.contains('cell_flag')) {

        }
        e.target.closest('.cell_hidden').classList.remove('cell_hidden', 'cell_flag');
        this.countOfCells -= 1;
        if (this.countOfCells === 0) {
          this.isFinished = true;
          doSmileWin();
          this.props.stopTime();
          this.props.addBestResult(this.props.time);
        }
      }
      if (e.target.closest('.cell-wrapper').innerText === 'dangerous') {
        this.isFinished = true;
        doSmileLose();
        this.props.stopTime();
      }
      if (e.target.closest('.cell-wrapper').innerText === '') {
        const cell = e.target.closest('.cell-wrapper');
        const dataposOfCell = cell.getAttribute('datapos');
        const [i, j] = dataposOfCell.split(' ').map((e) => parseFloat(e));

        for (let k = -1; k <= 1; k += 1) {
          for (let c = -1; c <= 1; c += 1) {
            const isColumnRange = (i + k >= 0) && (i + k < 9);
            const isRowRange = (j + c >= 0) && (j + c < 9);
            if (isColumnRange && isRowRange) {
              const fil = document.querySelector('.field');
              fil.childNodes.forEach((epo) => {

                if (epo.getAttribute('datapos') === `${i + k} ${j + c}`) {
                  this.openHidEmptyCell(epo);
                }
              });
            }
          }
        }
      }
      const cellsOfFlag = document.querySelectorAll('.cell_flag');
      this.props.removeFlag(9 - (this.props.countOfFlags + cellsOfFlag.length));

    }
  }
  addFlag = (e) => {
    e.preventDefault();
    if (e.target.closest('.cell_hidden')) {
      const cell = e.target.closest('.cell_hidden');
      if (this.props.isSoundPlay) {
        this.rightClickSound.play();
      }
      if (cell.classList.contains('cell_flag')) {
        this.props.removeFlag(1);
        cell.classList.remove('cell_flag');
      } else if (this.props.countOfFlags > 0) {
        this.props.addFlag(1);
        cell.classList.add('cell_flag');
      }
    }
  }

  render() {
    const fieldCells = this.state.cellsValue.reduce((acc, arr, indRow) => {
      acc.push(...arr.map((e, indColumn) => <Cell
        key={`${indRow} ${indColumn}`}
        cellValue={e === 0 ? null : e}
        position={`${indRow} ${indColumn}`}
      />));
      return acc;
    }, [])
    console.log(fieldCells)

    return (
      <div className="field" onClick={this.openHiddenCell} onContextMenu={this.addFlag}>
        {fieldCells}
      </div>
    )
  }

}

export default Field;
