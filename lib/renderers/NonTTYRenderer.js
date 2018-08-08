const chalk = require('chalk')
const Renderer = require('./Renderer')
const dateFormat = require('dateformat')
const renderTitle = require('./helpers/renderTitle')
const renderError = require('./helpers/renderError')
const renderSummary = require('./helpers/renderSummary')
const indentString = require('./helpers/indentString')

class NonTTYRenderer extends Renderer {
  render (task) {
    let output = ''

    if (task.isDone && task.totalTime && !task.__finished) {
      const date = dateFormat(new Date(), this.options.dateFormat)
      const title = renderTitle(task, 0, this.options)
      const timestamp = chalk.dim(date)

      output += `${timestamp} ${title}\n`

      if (task.summary) output += indentString(`${renderSummary(task)}\n`, date.length + 4)

      if (task.errors.length) {
        task.errors.forEach(message => {
          const error = renderError(message, this.options)
          output += indentString(`${error}\n`, date.length + 4)
        })
      }

      task.__finished = true
    }

    return output
  }

  log (output) {
    console.log(output)
  }
}

module.exports = NonTTYRenderer