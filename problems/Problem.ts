export interface Problem {
  input: any
  description: string
  solve(): any
  solve(input: any, ...args: any): any
  solveBonus(): any
  solveBonus(input: any, ...args: any): any
}
