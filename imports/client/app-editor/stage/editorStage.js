Template.editorStage.onRendered(function () {
  this.$('.editor-stage').ruler({
      unit: 'px',
      tickMajor: 100,
      tickMinor: 30,
      tickMicro: 10,
      showLabel: true,
      arrowStyle:'line'
  });
});

