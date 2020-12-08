import { NextApiRequest, NextApiResponse } from 'next'
import problems from '../../../problems'

export default function puzzleHandler(
  { query: { id }, method }: NextApiRequest,
  res: NextApiResponse
): void {
  switch (method) {
    case 'GET':
      respondWithProblem(id, res)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

function respondWithProblem(id: string | string[], res: NextApiResponse) {
  const { input, description, ...problem } = problems[[].concat(id)[0]]

  const { result: answer, time: answerTime } = withTime(problem.solve)
  const { result: bonusAnswer, time: bonusAnswerTime } = withTime(
    problem.solveBonus
  )

  if (problem) {
    // Get data from your database
    res.status(200).json({
      answer,
      answerTime,
      bonusAnswer,
      bonusAnswerTime,
      description,
      input,
    })
  } else {
    res.status(404).end('Problem not found')
  }
}

function withTime(func: () => any) {
  const hrstart = process.hrtime()
  const result = func()
  const hrtime = process.hrtime(hrstart)

  return {
    result,
    time: [hrtime[0], Math.floor(hrtime[1] / 1000000)],
  }
}
