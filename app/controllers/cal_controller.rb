class CalController < ApplicationController
  def index
  end

  def calculation
    calculator = Dentaku::Calculator.new
    result = calculator.evalulate('2+2')
    respond_to do |format|
      format.json { render :json => {result: result} }
    end
  end

end
