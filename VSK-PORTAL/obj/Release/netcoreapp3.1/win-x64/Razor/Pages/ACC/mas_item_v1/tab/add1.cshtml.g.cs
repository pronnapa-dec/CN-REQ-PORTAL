#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\ACC\mas_item_v1\tab\add1.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "bb6fabddf5230f4d040a339313017d328beee0b1"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.ACC.mas_item_v1.tab.Pages_ACC_mas_item_v1_tab_add1), @"mvc.1.0.view", @"/Pages/ACC/mas_item_v1/tab/add1.cshtml")]
namespace MIS_PORTAL.Pages.ACC.mas_item_v1.tab
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"bb6fabddf5230f4d040a339313017d328beee0b1", @"/Pages/ACC/mas_item_v1/tab/add1.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_ACC_mas_item_v1_tab_add1 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("style", new global::Microsoft.AspNetCore.Html.HtmlString("font-size:13px;"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<div class=\"tab-pane\" id=\"add1\">\r\n    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bb6fabddf5230f4d040a339313017d328beee0b13642", async() => {
                WriteLiteral("\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-8\">\r\n                <div class=\"card card-primary\">\r\n");
                WriteLiteral(@"                    <div class=""card-body row"">
                        <div class=""row"">
                            <div class=""col-sm-6"" style=""font-size:14px;"">
                                <div class=""row mg-t-15"">
                                    <div class=""col-sm-4"">
                                        <label for=""item_plantype"" class=""col-form-label tx-left"">&nbsp;&nbsp;&nbsp;&nbsp;Planing Type</label>
                                    </div>
                                    <div class=""col-sm-4 mg-t-10"">
                                        <input type=""radio"" class=""plantype"" name=""item_plantype"" id=""item_plantype_pur"" value=""Purchase"">&nbsp;&nbsp;&nbsp;<span class=""mg-b-25"">Purchase</span>
                                    </div>
                                    <div class=""col-sm-4 mg-t-10"">
                                        <input type=""radio"" class=""plantype"" name=""item_plantype"" id=""item_plantype_inh"" value=""Inhouse"">&nbsp;&nbsp;&nbsp;<span class=""mg-b-2");
                WriteLiteral("5\">Inhouse</span>\r\n                                    </div>\r\n                                </div>\r\n\r\n");
                WriteLiteral(@"

                                <div class=""row mg-t-15"">
                                    <label for=""item_conmin"" class=""col-sm-6 mg-t-6 col-form-label tx-left"">&nbsp;&nbsp;&nbsp;&nbsp;Constant MIN.</label>
                                    <label for=""item_conmax"" class=""col-sm-6 mg-t-6 col-form-label tx-left"">&nbsp;&nbsp;&nbsp;&nbsp;Constant MAX.</label>
                                </div>
                                <div class=""row mg-l-3"">
                                    <div class=""col-sm-6"">
                                        <input type=""text"" class=""form-control form-control-sm"" id=""item_conmin"" name=""item_conmin""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3098, "\"", 3112, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n                                    </div>\r\n                                    <div class=\"col-sm-6\">\r\n                                        <input type=\"text\" class=\"form-control form-control-sm\" id=\"item_conmax\" name=\"item_conmax\"");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3351, "\"", 3365, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>


                                <div class=""row mg-t-6"">
                                    <label for=""item_skufocus"" class=""col-sm-6 mg-t-6 col-form-label tx-left"">&nbsp;&nbsp;&nbsp;&nbsp;SKU Focus</label>
                                    <label for=""item_moq"" class=""col-sm-6 mg-t-6 col-form-label tx-left"">&nbsp;&nbsp;&nbsp;&nbsp;MOQ</label>
                                    <label class=""col-sm-6""></label>
                                </div>
                                <div class=""row mg-l-3"">
                                    <div class=""col-sm-6"">
                                        <input type=""text"" class=""form-control form-control-sm"" id=""item_skufocus"" name=""item_skufocus""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 4173, "\"", 4187, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n                                    </div>\r\n                                    <div class=\"col-sm-6\">\r\n                                        <input type=\"text\" class=\"form-control form-control-sm\" id=\"item_moq\" name=\"item_moq\"");
                BeginWriteAttribute("placeholder", " placeholder=\"", 4420, "\"", 4434, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>


                                <div class=""row mg-t-6"">
                                    <label for=""item_conmin"" class=""col-sm-6 mg-t-6 col-form-label tx-left"">&nbsp;&nbsp;&nbsp;&nbsp;Purchase Condition</label>
                                </div>
                                <div class=""row mg-l-3"">
                                    <div class=""col-sm-12"">
                                        <textarea class=""form-control form-control-sm"" id=""item_purcon"" name=""item_purcon"" rows=""3""></textarea>
                                    </div>
                                </div>
                            </div>



                            <div class=""col-sm-6"" style=""font-size:14px;"">
                                <div class=""row mg-t-15"">
                                    <div class=""col-sm-4"">
                                        <label for=""item_sourcetype"" class=""col-form-label");
                WriteLiteral(@" tx-left"">Source Type</label>
                                    </div>
                                    <div class=""col-sm-4 mg-t-10"">
                                        <input type=""radio"" class=""sourcetype"" name=""item_sourcetype"" id=""item_sourcetype_loc"" value=""Local"">&nbsp;&nbsp;&nbsp;<span class=""mg-b-25"">Local</span>
                                    </div>
                                    <div class=""col-sm-4 mg-t-10"">
                                        <input type=""radio"" class=""sourcetype"" name=""item_sourcetype"" id=""item_sourcetype_imp"" value=""Import"">&nbsp;&nbsp;&nbsp;<span class=""mg-b-25"">Import</span>
                                    </div>
                                </div>

                                <div class=""row mg-t-15"">
                                    <label for=""item_stocksettingproposal"" class=""col-sm-6 mg-t-6 col-form-label tx-left"">Stock Setting Proposal</label>
                                    <label for=""item_manualsafetystock"" class=");
                WriteLiteral(@"""col-sm-6 mg-t-6 col-form-label tx-left"">Manual Safety Stock</label>
                                </div>
                                <div class=""row"">
                                    <div class=""col-sm-6"">
                                        <input type=""text"" class=""form-control form-control-sm"" id=""item_stocksettingproposal"" name=""item_stocksettingproposal""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 6863, "\"", 6877, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-6"">
                                        <input type=""text"" class=""form-control form-control-sm"" id=""item_manualsafetystock"" name=""item_manualsafetystock""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 7138, "\"", 7152, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>

                                <div class=""row mg-t-6"">
                                    <label for=""item_leadtimesupp"" class=""col-sm-6 mg-t-6 col-form-label tx-left"">Supplier Lead Time</label>
                                    <label for=""item_leadtimeitem"" class=""col-sm-6 mg-t-6 col-form-label tx-left"">Item Lead Time</label>
                                </div>
                                <div class=""row mg-t-6"">
                                    <div class=""col-sm-6"">
                                        <input type=""text"" class=""form-control form-control-sm"" id=""item_leadtimesupp"" name=""item_leadtimesupp""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 7881, "\"", 7895, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n                                    </div>\r\n                                    <div class=\"col-sm-6\">\r\n                                        <input type=\"text\" class=\"form-control form-control-sm\" id=\"item_leadtimeitem\" name=\"item_leadtimeitem\"");
                BeginWriteAttribute("placeholder", " placeholder=\"", 8146, "\"", 8160, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>

                                <div class=""row mg-t-6"">
                                    <label for=""item_remarkbypm"" class=""col-sm-6 mg-t-6 col-form-label tx-left"">Remark by PM</label>
                                </div>
                                <div class=""row"">
                                    <div class=""col-sm-12"">
                                        <textarea class=""form-control form-control-sm"" id=""item_remarkbypm"" name=""item_remarkbypm"" rows=""3""></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class=""col-sm-12"" style=""font-size:14px;"">
                                <div class=""row mg-t-10"">
                                    <label for=""item_productlifecycle"" class=""col-sm-4 mg-t-6 col-form-label tx-left"">&nbsp;&nbsp;&nbsp;&nbsp;Product Life Cycle</label>
          ");
                WriteLiteral(@"                          <label for=""item_lifecycleflag"" class=""col-sm-4 mg-t-6 col-form-label tx-left"">&nbsp;&nbsp;&nbsp;&nbsp;Life Cycle Flag</label>
                                    <label for=""item_productactivity"" class=""col-sm-4 mg-t-6 col-form-label tx-left"">&nbsp;&nbsp;&nbsp;&nbsp;Product Activity</label>
                                </div>
                                <div class=""row mg-l-4"">
                                    <div class=""col-sm-4"">
                                        <input type=""text"" class=""form-control form-control-sm"" id=""item_productlifecycle"" name=""item_productlifecycle""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 9815, "\"", 9829, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n");
                WriteLiteral(@"                                    </div>
                                    <div class=""col-sm-4"">
                                        <select class=""form-control form-control-sm select2"" id=""item_lifecycleflag"" name=""item_lifecycleflag"" style=""width: 100%;"">
                                            ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bb6fabddf5230f4d040a339313017d328beee0b114797", async() => {
                    WriteLiteral("Please select..");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                                        </select>
                                    </div>
                                    <div class=""col-sm-4"">
                                        <select class=""form-control form-control-sm select2"" id=""item_productactivity"" name=""item_productactivity"" style=""width: 100%;"">
                                            ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bb6fabddf5230f4d040a339313017d328beee0b116199", async() => {
                    WriteLiteral("Please select..");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                                        </select>
                                    </div>
                                </div>

                                <div class=""row mg-t-10"">
                                    <label for=""item_lifecycleaction"" class=""col-sm-4 mg-t-6 col-form-label tx-left"">&nbsp;&nbsp;&nbsp;&nbsp;Life Cycle Action</label>
                                    <label for=""item_superbarcode"" class=""col-sm-4 mg-t-6 col-form-label tx-left"">&nbsp;&nbsp;&nbsp;&nbsp;Supersession Barcode</label>
                                    <label for=""item_relationshiptype"" class=""col-sm-4 mg-t-6 col-form-label tx-left"">&nbsp;&nbsp;&nbsp;&nbsp;Relationship Type</label>
                                </div>
                                <div class=""row mg-l-4"">
                                    <div class=""col-sm-4"">
                                        <select class=""form-control form-control-sm select2"" id=""item_lifecycleaction"" name=""item_lifecycleaction"" style=""width: 10");
                WriteLiteral("0%;\">\r\n                                            ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bb6fabddf5230f4d040a339313017d328beee0b118358", async() => {
                    WriteLiteral("Please select..");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                                        </select>
                                    </div>
                                    <div class=""col-sm-4"">
                                        <input type=""text"" class=""form-control form-control-sm"" id=""item_superbarcode"" name=""item_superbarcode""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 12294, "\"", 12308, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n");
                WriteLiteral(@"                                    </div>
                                    <div class=""col-sm-4"">
                                        <select class=""form-control form-control-sm select2"" id=""item_relationshiptype"" name=""item_relationshiptype"" style=""width: 100%;"">
                                            ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bb6fabddf5230f4d040a339313017d328beee0b120228", async() => {
                    WriteLiteral("Please select..");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                                        </select>
                                    </div>
                                </div>

                                <div class=""row mg-t-10"">
                                    <label for=""item_lockcode"" class=""col-sm-4 mg-t-6 col-form-label tx-left"">&nbsp;&nbsp;&nbsp;&nbsp;Lock code</label>
                                </div>
                                <div class=""row mg-l-4"">
                                    <div class=""col-sm-4"">
                                        <select class=""form-control form-control-sm select2"" id=""item_lockcode"" name=""item_lockcode"" style=""width: 100%;"">
                                            ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bb6fabddf5230f4d040a339313017d328beee0b121976", async() => {
                    WriteLiteral("Please select..");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <div class=""col-sm-4"" style=""font-size:13px;"">
                <div class=""card"">
                    <div class=""card-body"">
                        <div class=""row"">
                            <div class=""col text-center"">
                                <label class=""tx-12""><br />Total Invoice<br /></label>
                                <p class=""font-weight-bold tx-20"" id=""total_inv""></p>
                            </div><!-- col -->
                            <div class=""col border-left text-center "">
                                <label class=""tx-12"">Total Customer<br />(Prev. 3 Months)</label>
                                <p class=""font-weight-bold tx-20"" id=""total_cust_pre3m""></p>
        ");
                WriteLiteral(@"                    </div><!-- col -->
                            <div class=""col border-left text-center"">
                                <label class=""tx-12"">Total Customer<br />(Prev. 12 Months)</label>
                                <p class=""font-weight-bold tx-20"" id=""total_cust_pre12m""></p>
                            </div><!-- col -->
                        </div><!-- row -->
                    </div>
                </div>


                <div class=""card card-success"">
                    <div class=""card-header pb-0"">
                        <h5 class=""card-title mb-0 pb-0"">Stock Status</h5>
                    </div>
                    <div class=""card-body"">
                        <div class=""row"">
                            <div class=""col-sm-5"">
                                <label for=""item_stockstatus"" class=""col-form-label tx-left"">Stock Status</label>
                            </div>
                            <div class=""col-sm-7"">
                      ");
                WriteLiteral("          <select class=\"form-control form-control-sm select2\" id=\"item_stockstatus\" name=\"item_stockstatus\" style=\"width: 100%;\">\r\n                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bb6fabddf5230f4d040a339313017d328beee0b125346", async() => {
                    WriteLiteral("Please select..");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                                </select>
                            </div>
                        </div>

                        <div class=""row mg-t-2"">
                            <div class=""col-sm-5"">
                                <label class=""col-form-label tx-left"">Suggestion</label>
                            </div>
                            <div class=""col-sm-7"">
                                <label id=""item_StockStatussuggestion"" class=""col-form-label tx-left""></label>
                            </div>
                        </div>

                        <div class=""row mg-t-2"">
                            <div class=""col-sm-5"">
                                <label class=""col-form-label tx-left"">Review date</label>
                            </div>
                            <div class=""col-sm-7"">
                                <label id=""item_StockStatusReviewDate"" class=""col-form-label tx-left""></label>
                            </div>
                  ");
                WriteLiteral(@"      </div>

                        <div class=""row mg-t-2"">
                            <div class=""col-sm-5"">
                                <label class=""col-form-label tx-left"">Last updated by User</label>
                            </div>
                            <div class=""col-sm-7"">
                                <label id=""item_StockStatusChangeUser"" class=""col-form-label tx-left""></label>
                            </div>
                        </div>

                        <div class=""row mg-t-2"">
                            <div class=""col-sm-5"">
                                <label class=""col-form-label tx-left"">Invoice Frequency</label>
                            </div>
                            <div class=""col-sm-7"">
                                <label id=""item_invfrecodedesc"" class=""col-form-label tx-left""></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    ");
                WriteLiteral("    </div>\r\n    ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n</div>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
