class CalController < ApplicationController

  def index
  end

  def calculation
    calc = Dentaku::Calculator.new
    respond_to do |format|
      format.json { render :json => { result: calc.evaluate(params[:values])} }
    end
  end

end
