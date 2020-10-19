module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  filters.visible = function (results, data) {
    if (results) {
      return results.filter(result => (
        result.attribute == null ||
        data[result.attribute] === result.value ||
        (data[result.attribute] && data[result.attribute].includes(result.value))
      ))
    }
  }

  filters.maybe = function (results, data) {
    if (results) {
      return results.filter(result => (
        (result.attribute === 'employ' && data.employ === 'maybe') ||
        (result.attribute === 'vat' && data.vat === 'maybe') ||
        (result.attribute === 'other')
      ))
    }
  }

  filters.irelevant = function (results, data) {
    if (results) {
      return results.filter(result => (data['not-relevant'].includes(result.id)))
    }
  }

  filters.relevant = function (results, data) {
    if (results) {
      return results.filter(result => (!data['not-relevant'].includes(result.id)))
    }
  }

  filters.completed = function (results, data) {
    if (results) {
      return results.filter(result => data.completed.includes(result.id))
    }
  }

  filters.isCompleted = function (result, data) {
    if (data) {
      return data.completed.includes(result.id) || (result.href === '/licence/start' && data['answers-checked'])
    }
  }

  filters.isIrelevant = function (result, data) {
    if (data) {
      return data['not-relevant'].includes(result.id)
    }
  }

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
