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
  console.log(sqrMatrix)
  for (let i = 0; i < sqrMatrix.length; i += 1) {
    for (let j = 0; j < sqrMatrix.length; j += 1) {
      if (sqrMatrix[i][j] === 'p') {
        for (let k = -1; k <= 1; k += 1) {
          for (let c = -1; c <= 1; c += 1) {
            const isColumnRange = (i + k >= 0) && (i + k < sqrMatrix.length);
            const isRowRange = (j + c >= 0) && (j + c < sqrMatrix.length);

            if (isColumnRange && isRowRange) {
              const isNotMine = !((k === 0 && c === 0) || (sqrMatrix[i + k][j + c] === 'p'));

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
  const randomCells = shuffle([...Array(9).fill('p'), ...Array(72).fill(0)]);
  const matrix = arrToSqrMatrix(randomCells);
  addNumbers(matrix);
  return matrix;
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
    const music = document.getElementById('music');
    const sound = document.getElementById('sound');
    document.body.addEventListener('keydown', (e) => {
      if (e.code === 'KeyR') {
        this.restart();
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  if (this.countOfCells === 0) {
    this.isFinished = true;
    alert('You win');
  }
  this.leftClickSound.volume = this.props.soundVolume;
  this.rightClickSound.volume = this.props.soundVolume;
}



  restart = () => {
  this.countOfCells = 72;
  const newCellsValue = createMinesweeperField();
  this.isFinished = false;
  document.querySelectorAll('.cell').forEach((e) => {
    e.classList.add('cell_hidden');
    e.classList.remove('cell_flag');
  })
  this.setState({cellsValue: newCellsValue});

}

  openHiddenCell = (e) => {
    if (this.isFinished) {
      return;
    }
    if (this.props.isSoundPlay) {
      this.leftClickSound.play();
    }


    const openHidEmptyCell = (p) => {
      if (p.childNodes[0].classList.contains('cell_hidden') && p.innerText !== 'p') {
        if (p.childNodes[0].classList.contains('cell_flag')) {
          this.props.removeFlag();
        }
        p.childNodes[0].classList.remove('cell_hidden');
        this.countOfCells -= 1;
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
                if (epo.getAttribute('datapos') === `${i+k} ${j+c}`) {
                  openHidEmptyCell(epo);
                }
              });
            }
          }
        }
      }
    }
    if (e.target.closest('.cell-wrapper')) {
      if (e.target.closest('.cell_hidden')) {
        if (e.target.closest('.cell_hidden').classList.contains('cell_flag')) {
          this.props.removeFlag();
        }
        e.target.closest('.cell_hidden').classList.remove('cell_hidden','cell_flag');
        this.countOfCells -= 1;
        this.forceUpdate();
      }
      if (e.target.closest('.cell-wrapper').innerText === 'p') {
        this.isFinished = true;
        alert('You lose');
        this.restart();
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

                if (epo.getAttribute('datapos') === `${i+k} ${j+c}`) {
                  openHidEmptyCell(epo);
                }
              });
            }
          }
        }
      }
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
        this.props.removeFlag();
        cell.classList.remove('cell_flag');
      } else if (this.props.countOfFlags > 0) {
        this.props.addFlag();
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

    return (
      <div className="field" onClick={this.openHiddenCell} onContextMenu={this.addFlag}>
        {fieldCells}
      </div>
    )
  }

}

export default Field;
