#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\CN\cn-opt-lists\Form__.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "989ce97d0b99463313e7879376ba97c9e3a3dfc3"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.CN.cn_opt_lists.Pages_CN_cn_opt_lists_Form__), @"mvc.1.0.view", @"/Pages/CN/cn-opt-lists/Form__.cshtml")]
namespace MIS_PORTAL.Pages.CN.cn_opt_lists
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"989ce97d0b99463313e7879376ba97c9e3a3dfc3", @"/Pages/CN/cn-opt-lists/Form__.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_CN_cn_opt_lists_Form__ : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("autocomplete", new global::Microsoft.AspNetCore.Html.HtmlString("off"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<!-- Scroll with content modal -->\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "989ce97d0b99463313e7879376ba97c9e3a3dfc34173", async() => {
                WriteLiteral(@"
    <div class=""modal effect-flip-vertical"" id=""modal-frm_data"" data-keyboard=""false"" data-backdrop=""static"">
        <div class=""modal-dialog modal-dialog-scrollable modal-dialog-centered"" role=""document"" style=""max-width:690px"">
            <div class=""modal-content modal-content-demo"">
                <div class=""modal-header"">
                    <h6 class=""modal-title"">");
#nullable restore
#line 7 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\CN\cn-opt-lists\Form__.cshtml"
                                       Write(ViewData["Content-Title-Page"]);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" Form</h6><button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">
                    <div class=""kt-portlet__body"">


                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""main-content-label tx-12 tx-medium tx-gray-600"" for=""salefile_number"">เลขที่ใบเสร็จ:</label>
                                <input type=""text"" class=""form-control"" id=""salefile_number"" name=""salefile_number""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1113, "\"", 1127, 0);
                EndWriteAttribute();
                WriteLiteral(@" readonly>
                            </div>

                            <div class=""col-md-7"">
                                <label class=""main-content-label tx-12 tx-medium tx-gray-600"" for=""saletra_item_name"">รายการสินค้า:</label>
                                <input type=""text"" class=""form-control"" id=""saletra_item_name"" name=""saletra_item_name""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1490, "\"", 1504, 0);
                EndWriteAttribute();
                WriteLiteral(@" readonly>
                            </div>

                            <div class=""col-md-2"">
                                <label class=""main-content-label tx-12 tx-medium tx-gray-600"" for=""cn_qty"">จำนวน:</label>
                                <input type=""number"" class=""form-control"" id=""cn_qty"" name=""cn_qty""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1829, "\"", 1843, 0);
                EndWriteAttribute();
                WriteLiteral(@" readonly>
                            </div>
                        </div>

                        <div class=""row row-sm mg-t-15"">
                            <div class=""col-md-3"">
                                <label for=""salefile_invcode"">รหัสลูกค้า:</label>
                                <input type=""text"" class=""form-control"" id=""salefile_invcode"" name=""salefile_invcode""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2236, "\"", 2250, 0);
                EndWriteAttribute();
                WriteLiteral(@" disabled required data-parsley-error-message="""">
                            </div>

                            <div class=""col-md-7"">
                                <label for=""salefile_invname"">ลูกค้า:</label>
                                <input type=""text"" class=""form-control"" id=""salefile_invname"" name=""salefile_invname""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2588, "\"", 2602, 0);
                EndWriteAttribute();
                WriteLiteral(@" disabled required data-parsley-error-message="""">
                            </div>

                            <div class=""col-md-2"">
                                <label for=""job_status"">สถานะ:</label>
                                <input type=""text"" class=""form-control"" id=""job_status"" name=""job_status""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2921, "\"", 2935, 0);
                EndWriteAttribute();
                WriteLiteral(@" value=""OPEN"" disabled style=""color:red; font-weight:bold;"">
                            </div>
                        </div>

                        <div class=""row row-sm mg-t-15"">
                            <div class=""col-md-3"">
                                <label for=""cn_pre_job_type"">การแจ้งรับ:</label>
                                <input type=""text"" class=""form-control"" id=""cn_pre_job_type"" name=""cn_pre_job_type"" />
                            </div>

                            <div class=""col-md-7"">
                                <label for=""job_comment"">สาเหตุ</label>
                                <input type=""text"" class=""form-control"" id=""job_comment"" name=""job_comment""");
                BeginWriteAttribute("value", " value=\"", 3650, "\"", 3658, 0);
                EndWriteAttribute();
                WriteLiteral(@" readonly />
                            </div>
                            <div class=""col-md-2"">
                                <label for=""created_by"">บันทึกโดย:</label>
                                <input type=""text"" class=""form-control"" id=""created_by"" name=""created_by""");
                BeginWriteAttribute("value", "  value=\"", 3942, "\"", 3951, 0);
                EndWriteAttribute();
                WriteLiteral(@" readonly />
                            </div>
                        </div>


                        <!--<div class=""form-group form-group-sm  row"">
        <label class=""col-sm-3 col-form-label"">วันที่/เวลา :</label>
        <div class=""col-sm-9"">
            <input class=""form-control"" id=""cn_datetime"" name=""cn_datetime"" type=""text"" value="""" required>
        </div>

    </div>
    <div class=""form-group form-group-sm  row"">
        <label class=""col-sm-3 col-form-label"">สถานะ :</label>
        <div class=""col-sm-9"">
            <input type=""text"" class=""form-control"" id=""job_status"" name=""job_status"" placeholder="""" value="""" style=""font-weight:bold;"">

        </div>
    </div>
    <div class=""form-group form-group-sm  row"">
        <label class=""col-sm-3 col-form-label"">ผู้รับผิดชอบ :</label>
        <div class=""col-sm-9"">
            <input class=""form-control"" id=""job_assige"" name=""job_assige"" type=""text"" value="""" required readonly>
        </div>
    </div>
    <div class=""f");
                WriteLiteral(@"orm-group form-group-sm  row"">
        <label class=""col-md-3 col-form-label"">เลขที่ใบเสร็จ :</label>
        <div class=""col-md-9"">
            <input type=""text"" class=""form-control"" id=""salefile_number"" name=""salefile_number"" value="""">
        </div>
    </div>
    <div class=""form-group form-group-sm  row"">
        <label class=""col-md-3 col-form-label"">ข้อมูลสินค้า :</label>
        <div class=""col-md-9"">
            <input type=""text"" class=""form-control"" id=""saletra_item_name"" name=""saletra_item_name"" value="""" readonly>
        </div>
    </div>
    <div class=""form-group form-group-sm row "">
        <label class=""col-sm-3 col-form-label"">QTY. :</label>
        <div class=""col-sm-9"">
            <input type=""text"" class=""form-control"" id=""cn_qty"" name=""cn_qty"" value="""" readonly>
        </div>
    </div>
    <div class=""form-group form-group-sm row "">
        <label class=""col-sm-3 col-form-label"">การรับแจ้ง :</label>
        <div class=""col-sm-9"">
            <input class=""form-co");
                WriteLiteral(@"ntrol"" id=""source_site_code"" name=""source_site_code"" type=""text"" value="""" readonly>
        </div>
    </div>
    <div class=""form-group form-group-sm row "">
        <label class=""col-sm-3 col-form-label"">บันทึกโดย :</label>
        <div class=""col-sm-9"">
            <input class=""form-control"" id=""created_by"" name=""created_by"" type=""text"" value="""" readonly>
        </div>
    </div>
    <div class=""form-group form-group-sm row"">
        <label class=""col-sm-3 col-form-label"">สาเหตุ : </label>
        <div class=""col-sm-9"">
            <select class=""form-control cn_comment"" id=""job_comment"" name=""job_comment"" data-width=""100%"" required="""">
                <option value="""">-- เลือกสาเหตุการรับคืน --</option>-->
");
                WriteLiteral(@"                        <!--</select>
        </div>
    </div>
    <div class=""form-group form-group-sm row "">
        <label class=""col-sm-3 col-form-label"">วันที่เข้ารับของ :</label>
        <div class=""col-sm-9"">
            <input class=""form-control"" id=""pick_up_date"" name=""pick_up_date"" type=""text"" value="""" readonly>

        </div>
    </div>
    <div class=""form-group form-group-sm row hide-driver"">
        <label class=""col-sm-3 col-form-label"">คนขับรถ :</label>
        <div class=""col-sm-9"">
            <input class=""form-control "" id=""driver_name"" name=""driver_name"" type=""text"" value="""">
        </div>
    </div>
    <div class=""form-group form-group-sm row "">
        <label class=""col-sm-3 col-form-label"">สถานะสินค้า :</label>
        <div class=""col-sm-9 item_condition"">
            <input class=""col-sm-2"" type=""radio"" id=""item_good"" name=""item_condition"" value=""1"">
            <label for=""good"">สมบูรณ์</label><br>
            <input class=""col-sm-2"" type=""radio"" id=""item_ba");
                WriteLiteral(@"d"" name=""item_condition"" value=""2"">
            <label for=""bad"">ไม่สมบูรณ์</label><br>
        </div>
    </div>
    <div class=""form-group form-group-sm row hide_job_status"">
        <label class=""col-sm-3 col-form-label"">สถานะ : </label>
        <div class=""col-sm-9"">
            <select class=""form-control"" id=""job_status_edit"" name=""job_status_edit"">
                <option value=""receive"">Receive</option>
                <option value=""complete"">Complete </option>
                <option value=""rejected"">Rejected </option>
            </select>
        </div>
    </div>
    <div class=""form-group form-group-sm row "">
        <label class=""col-sm-3 col-form-label"">หมายเหตุ :</label>
        <div class=""col-sm-9"">
            <input class=""form-control "" id=""pick_up_remark"" name=""pick_up_remark"" type=""text"" value="""">
        </div>
    </div>-->

                    </div>
                    <div class=""modal-footer"">
                        <button id=""btn-save_exit"" class=""btn ri");
                WriteLiteral("pple btn-primary btn-save_form\" data-action=\"save_exit\" type=\"submit\">Save</button>\r\n");
                WriteLiteral(@"                        <button class=""btn ripple btn-secondary"" data-dismiss=""modal"" type=""button"">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--End Scroll with content modal -->
");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
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